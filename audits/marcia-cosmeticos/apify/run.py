"""Consultas extras da auditoria Márcia Cosméticos via Apify.

Uso: APIFY_TOKEN=... python3 run.py [nome ...]
Sem nomes, roda todas. Cada resultado vai para data/<nome>.json.
"""
import json
import os
import sys
import time
import urllib.request

API = "https://api.apify.com/v2"
TOKEN = os.environ.get("APIFY_TOKEN")
OUT = os.path.join(os.path.dirname(__file__), "data")

BRANDS_IG = ["marciacosmeticosoficial", "salonlinebrasil", "skalacosmeticos",
             "bioextratus", "lolacosmetics", "embelleze", "novexoficial", "skafecosmeticos"]

RUNS = {
    # Seguidores, bio, link e frequência de posts de cada marca
    "ig_perfis": ("apify~instagram-profile-scraper", {"usernames": BRANDS_IG}),
    # Últimos 30 posts da Márcia: formato, curtidas, comentários, datas
    "ig_posts_marcia": ("apify~instagram-scraper", {
        "directUrls": ["https://www.instagram.com/marciacosmeticosoficial/"],
        "resultsType": "posts", "resultsLimit": 30}),
    # TikTok: perfil e vídeos da Márcia e dos dois concorrentes mais próximos
    "tiktok": ("clockworks~tiktok-scraper", {
        "profiles": ["marciacosmeticosoficial", "skalacosmeticos", "bioextratusoficial"],
        "resultsPerPage": 20}),
    # Mercado Livre: vendedores, preço e frete dos produtos Márcia
    "mercadolivre": ("karamelo~mercadolivre-scraper-brasil-portugues", {
        "search": "marcia cosmeticos aney", "maxItems": 60}),
    # Tráfego estimado e canais de aquisição do site e dos concorrentes
    "similarweb": ("tri_angle~similarweb-scraper", {
        "websites": ["marciacosmeticos.com.br", "salonline.com.br", "skala.com.br",
                     "bioextratus.com.br", "lolacosmetics.com.br"]}),
    # Como a marca aparece no Google: nome, páginas antigas, concorrentes em buscas de categoria
    "google_serp": ("apidojo~google-search-scraper", {
        "searchTerms": ["márcia cosméticos", "site:marciaonline.com.br", "site:marciacosmeticos.com.br",
                        "shampoo aney brilho molhado", "descolorante márcia", "creme para cachos barato"],
        "countryCode": "br", "languageCode": "pt-BR", "maxPagesPerQuery": 1, "maxItems": 60}),
}


def call(method, path, body=None):
    req = urllib.request.Request(f"{API}{path}", method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)


def run(name):
    actor, payload = RUNS[name]
    started = call("POST", f"/acts/{actor}/runs", payload)["data"]
    run_id = started["id"]
    print(f"{name}: iniciado {run_id}")
    while True:
        status = call("GET", f"/actor-runs/{run_id}")["data"]
        if status["status"] not in ("READY", "RUNNING"):
            break
        time.sleep(10)
    items = call("GET", f"/datasets/{status['defaultDatasetId']}/items?clean=true&format=json")
    with open(os.path.join(OUT, f"{name}.json"), "w") as f:
        json.dump(items, f, ensure_ascii=False, indent=1)
    cost = status.get("usageTotalUsd")
    print(f"{name}: {status['status']} · {len(items)} itens · US$ {cost}")


if __name__ == "__main__":
    if not TOKEN:
        sys.exit("Defina APIFY_TOKEN no ambiente.")
    os.makedirs(OUT, exist_ok=True)
    for n in sys.argv[1:] or RUNS:
        try:
            run(n)
        except Exception as e:  # uma consulta com erro não interrompe as outras
            print(f"{n}: erro {e}")

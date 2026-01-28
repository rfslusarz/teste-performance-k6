# k6 Performance Testing Portfolio

![k6](https://img.shields.io/badge/k6-Performance-purple?style=flat-square&logo=k6)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-blue?style=flat-square&logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Reports](https://img.shields.io/badge/Reports-HTML-orange?style=flat-square)

Este projeto demonstra uma suíte completa de testes de performance automatizados utilizando [k6](https://k6.io/). O objetivo é servir como portfólio profissional e referência técnica para implementação de testes de carga, stress e smoke em APIs.

## Tecnologias Utilizadas

- **k6**: Ferramenta open-source de teste de carga focada em desenvolvedores.
- **JavaScript (ES6)**: Linguagem utilizada para scriptar os cenários.
- **k6-reporter**: Geração de relatórios visuais HTML.

## Estrutura do Projeto

```
src/
├── config/
│   ├── endpoints.js    # Definição de URLs base e rotas
│   └── thresholds.js   # SLAs reutilizáveis (Limites de aceitação)
├── tests/
│   ├── smoke-test.js   # Validação rápida de saúde da API
│   ├── load-test.js    # Teste de carga com tráfego esperado
│   └── stress-test.js  # Teste de estresse para encontrar limites
└── utils/
    └── reporter.js     # Utilitário para geração de relatórios HTML
```

## Tipos de Testes e Como Executar

Para executar os testes, você precisará ter o k6 instalado. [Guia de Instalação](https://k6.io/docs/get-started/installation/).

### 1. Smoke Test
**Objetivo:** Validar se a API está no ar e respondendo ao mínimo necessário.  
**Cenário:** 1 usuário por 10 segundos.  
**Quando usar:** Em pipelines de CI/CD, logo após um deploy (Health Check).

```bash
k6 run src/tests/smoke-test.js
```

### 2. Load Test
**Objetivo:** Simular o tráfego médio/alto esperado no dia-a-dia.  
**Cenário:** Rampa até 20 usuários, sustentação por 1 minuto, e rampa de descida.  
**Quando usar:** Antes de releases importantes para garantir que não houve degradação de performace (Performance Regression Testing).

```bash
k6 run src/tests/load-test.js
```

### 3. Stress Test
**Objetivo:** Identificar o ponto de quebra da aplicação.  
**Cenário:** Carga agressiva subindo até 100 usuários simultâneos.  
**Quando usar:** Periodicamente (ex: mensalmente) ou antes de grandes eventos (Black Friday) para conhecer a capacidade máxima da infraestrutura.

```bash
k6 run src/tests/stress-test.js
```

## Relatórios HTML 📊

Ao final de cada execução, um relatório HTML detalhado será gerado automaticamente na pasta `reports/`.

## Relatórios de Exemplo

- [Smoke Test Report](reports/exemplo-smoke-test.html)
- [Load Test Report](reports/exemplo-load-test.html)
- [Stress Test Report](reports/exemplo-stress-test.html)

Exemplo de saída: `reports/load-test_2023-10-27-15-30-00.html`

Esses relatórios contêm gráficos de tempo de resposta, taxa de requisições e divisão por status code, similar ao Allure, mas gerado nativamente pelo script k6.

## Métricas e SLAs (Thresholds)

Os testes estão configurados com *Thresholds* para falhar automaticamente caso os SLAs não sejam atendidos:

- **http_req_duration (p95)**: 95% das requisições devem responder em menos de 500ms (ou 2s/3s dependendo do teste).
- **http_req_failed**: A taxa de erro não deve ultrapassar 1% (ou 5% em stress).

## Diferenciais Técnicos

- **Modularização**: URLs e SLAs separados dos scripts de teste para fácil manutenção.
- **Stages**: Uso de rampas (ramp-up/ramp-down) para simulação mais realista.
- **Checks**: Validações funcionais (status 200, conteúdo JSON) além das métricas de tempo.
- **Relatórios**: Geração automática de dashboards HTML para análise visual.

---
*Projeto criado para fins educacionais e de portfólio.*

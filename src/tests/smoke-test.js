import http from 'k6/http';
import { check, sleep } from 'k6';
import { ENDPOINTS, HEADERS } from '../config/endpoints.js';
import { generateSummary } from '../utils/reporter.js';

/**
 * SMOKE TEST
 * Objetivo: Validação rápida para garantir que a API está no ar e respondendo corretamente.
 * Execução Típica: 1 VU (Virtual User) por um curto período.
 * Uso: Pós-deploy, validação de ambiente.
 */

export const options = {
    vus: 1, // Apenas 1 usuário simulado
    duration: '10s', // Teste rápido de 10 segundos
    thresholds: {
        http_req_failed: ['rate<0.01'], // Menos de 1% de falhas permitidas
        http_req_duration: ['p(95)<1000'], // 95% das requisições devem ser mais rápidas que 1s
    },
};

export default function () {
    // Teste 1: Buscar posts (GET)
    const resPosts = http.get(`${ENDPOINTS.BASE_JSONPHOLDER}${ENDPOINTS.POSTS}`, { headers: HEADERS });

    check(resPosts, {
        'status posts 200': (r) => r.status === 200,
        'posts response time < 500ms': (r) => r.timings.duration < 500,
    });

    // Teste 2: Buscar produtos (GET)
    const resProducts = http.get(`${ENDPOINTS.BASE_DUMMYJSON}${ENDPOINTS.PRODUCTS}`, { headers: HEADERS });

    check(resProducts, {
        'status products 200': (r) => r.status === 200,
        'products Content-Type JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    });

    sleep(1); // Simula "think time" de 1 segundo entre iterações
}

export function handleSummary(data) {
    return generateSummary(data, 'smoke-test');
}

import http from 'k6/http';
import { check, sleep } from 'k6';
import { ENDPOINTS, HEADERS } from '../config/endpoints.js';
import { THRESHOLDS } from '../config/thresholds.js';
import { generateSummary } from '../utils/reporter.js';

/**
 * LOAD TEST
 * Objetivo: Avaliar o desempenho da API sob carga "normal" esperada.
 * Valida se a aplicação atende aos SLAs (Service Level Agreements).
 * Execução Típica: Fixo número de VUs por um tempo sustentado.
 */

export const options = {
    stages: [
        { duration: '30s', target: 30 },
        { duration: '2m', target: 30 },
        { duration: '30s', target: 0 },  // Rampa de descida (cool-down)
    ],
    thresholds: THRESHOLDS, // Reutilizando thresholds globais
};

export default function () {
    // Cenário: Usuário acessa lista de produtos e depois detalhes de um post

    // Passo 1: Listar produtos
    const resProducts = http.get(`${ENDPOINTS.BASE_DUMMYJSON}${ENDPOINTS.PRODUCTS}?limit=10`, { headers: HEADERS });

    check(resProducts, {
        'products status 200': (r) => r.status === 200,
        'products duration < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(Math.random() * 2 + 1); // Think time variável (1-3s)

    // Passo 2: Acessar Posts
    const resPosts = http.get(`${ENDPOINTS.BASE_JSONPHOLDER}${ENDPOINTS.POSTS}`, { headers: HEADERS });

    check(resPosts, {
        'posts status 200': (r) => r.status === 200,
    });

    sleep(1);
}

export function handleSummary(data) {
    return generateSummary(data, 'load-test');
}

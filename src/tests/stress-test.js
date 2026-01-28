import http from 'k6/http';
import { check, sleep } from 'k6';
import { ENDPOINTS, HEADERS } from '../config/endpoints.js';
import { generateSummary } from '../utils/reporter.js';

/**
 * STRESS TEST
 * Objetivo: Identificar o limite da API e verificar como ela se comporta sob carga extrema.
 * Busca encontrar o ponto de quebra (breaking point) e a recuperação (recovery).
 * Execução Típica: Carga progressiva até exceder a capacidade normal.
 */

export const options = {
    stages: [
        { duration: '1m', target: 20 },  // Carga normal
        { duration: '2m', target: 50 },  // Carga alta
        { duration: '2m', target: 100 }, // Ponto de estresse (Breaking point search)
        { duration: '1m', target: 0 },   // Recuperação (Cool-down)
    ],
    thresholds: {
        http_req_failed: ['rate<0.03'],
        http_req_duration: ['p(95)<1500'],
    },
};

export default function () {
    // Cenário intensivo: Listagem e criação de posts simultâneas

    const payload = JSON.stringify({
        title: 'k6 Stress Test',
        body: 'Testing API limits',
        userId: 1,
    });

    const params = {
        headers: HEADERS,
    };

    const resPost = http.post(`${ENDPOINTS.BASE_JSONPHOLDER}${ENDPOINTS.POSTS}`, payload, params);

    check(resPost, {
        'post created 201': (r) => r.status === 201,
    });

    sleep(1);
}

export function handleSummary(data) {
    return generateSummary(data, 'stress-test');
}

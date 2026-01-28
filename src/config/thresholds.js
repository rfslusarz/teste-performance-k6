// Limites de aceitação (SLA) padrão
export const THRESHOLDS = {
    http_req_duration: ['p(95)<250'],
    // Menos de 1% de requisições com falha
    http_req_failed: ['rate<0.01'],
};

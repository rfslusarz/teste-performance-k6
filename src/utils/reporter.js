import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

/**
 * Função utilitária para gerar relatórios padronizados.
 * Deve ser exportada como handleSummary no script de teste.
 */
export function generateSummary(data, testName) {
    const reportName = `reports/${testName}_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.html`;
    return {
        [reportName]: htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}

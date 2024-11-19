import { get30DaysAgoDate } from "../../util/dateUtils";

export default class ReportService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        this.IMAGE_URL = process.env.NEXT_PUBLIC_MINIO_URL;
    }

    // Método para obtener el KPI de órdenes
    async getOrdersKPI(
        startDate = get30DaysAgoDate(),
        endDate = new Date(),
        token
    ) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/report/order-kpi?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } 

            const data = await response.payload.json();
            return data;  // Retornamos el contenido del payload
        } catch (error) {
            console.error("Error fetching orders KPI", error);
            throw error;
        }
    }

    /**
     * Fetches the weekly sales report for the last 7 weeks.
     * @param {string} token - The JWT token for authorization.
     * @returns {Promise<Object>} - The sales report data.
     */
    async getWeeklySalesReport(token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/bill/report/weekly-sales`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Weekly Sales Report Data:", data.payload);
            return data.payload; // Return the weekly sales report
        } catch (error) {
            console.error("Error fetching weekly sales report:", error);
            throw error;
        }
    }
}

import { get30DaysAgoDate } from "../../util/dateUtils";

export default class ReportService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        this.IMAGE_URL = process.env.NEXT_PUBLIC_MINIO_URL;
    }

    // Método para obtener el KPI de órdenes
    async getOrdersKPI(
        token,
        startDate = get30DaysAgoDate(),
        endDate = new Date()
    ) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/report/order-kpi?startDate=${startDate.toISOString().slice(0, 19)}&endDate=${endDate.toISOString().slice(0, 19)}`, {
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
            console.log("mis ordenesss: ",data);
            return data.payload;  // Retornamos el contenido del payload
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
            const response = await fetch(`${this.BASE_URL}/api/v1/report/weekly-sales`, {
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

    /**
     * Fetches the monthly sales report for the last 6 months.
     * @param {string} token - The JWT token for authorization.
     * @param {string} startDate - The start date for the report.
     * @param {string} endDate - The end date for the report.
     * @param {string} top - The number of top products to include in the report.
     * @returns {Promise<Object>} - The sales report data.
     * @throws {Error} - If an error occurs while fetching the report.
     * @async
     */
    async getMostSoldItems(
        token,
        startDate = get30DaysAgoDate(),
        endDate = new Date(),
        top = 10
    ) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/report/menu/most-sold?startDate=${startDate.toISOString().slice(0, 19)}&endDate=${endDate.toISOString().slice(0, 19)}&top=${top}`, {
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
            console.log("Most Sold Items Data:", data.payload);
            return data.payload; // Return the most sold items report
        } catch (error) {
            console.error("Error fetching most sold items report:", error);
            throw error;
        }
    }
}

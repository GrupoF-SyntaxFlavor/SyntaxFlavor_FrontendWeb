export default class ReportService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
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

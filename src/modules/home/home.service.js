export const HomeService = {
    async getPageData() {
        // Default data, bisa diubah ambil dari DB
        return { title: 'Home', content: 'Content for Home page' };
    }
};

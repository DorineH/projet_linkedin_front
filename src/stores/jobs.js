import { defineStore } from 'pinia'
import api from '@/lib/api'

export const useJobsStore = defineStore('jobs', {
    state: () => ({
        items: [],
        total: 0,
        loading: false,
        error: null,
        // filtres
        q: '',
        company: '',
        contract_type: '',
        date_from: '',
        date_to: '',
        sort: '-posted_date',
        page: 1,
        page_size: 20,
    }),
    actions: {
        async fetch() {
            this.loading = true
            this.error = null
            try {
                const params = {
                    q: this.q || undefined,
                    company: this.company || undefined,
                    contract_type: this.contract_type || undefined,
                    date_from: this.date_from || undefined,
                    date_to: this.date_to || undefined,
                    sort: this.sort,
                    page: this.page,
                    page_size: this.page_size,
                }

                console.log(this.q)
                console.log('API params envoyés :', params)

                const { data } = await api.get('/api/jobs', { params })
                this.items = data.items
                this.total = data.total
            } catch (e) {
                this.error = e?.message || 'Erreur de chargement'
            } finally {
                this.loading = false
            }
        },
    },
})
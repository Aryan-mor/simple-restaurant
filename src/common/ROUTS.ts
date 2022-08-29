const ROUTS = {
    Home: {
        rout: '/',
        title: 'Home'
    },
    Invoices: {
        rout: 'invoices',
        createLink: () => '/invoices',
        title: 'Invoices',
        Single: {
            rout: ':invoiceId',
            title: 'Invoice',
            createLink: (invoiceId: number): string => {
                return `/${ROUTS.Invoices.rout}/${invoiceId}`
            },
            getTitle: (invoiceTitle: string): string => {
                return `${ROUTS.Invoices.Single.title} - ${invoiceTitle}`
            }
        }
    }
}

export default ROUTS;

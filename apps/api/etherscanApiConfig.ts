export const etherscanConfig = {
    baseURL: 'https://api.etherscan.io/api/',
    modules: {
        account: 'account',
    },
    actions: {
        getTransactions: 'txlist',
        getBalance: 'balance',
    },
};
    
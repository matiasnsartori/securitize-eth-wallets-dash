export const isOldWallet = (timestamp: number): boolean => {
    const firstTransactionDate = new Date(timestamp * 1000);
    const oneYearAgoDate = new Date();
    oneYearAgoDate.setFullYear(oneYearAgoDate.getFullYear() - 1);
  
    return firstTransactionDate < oneYearAgoDate;
  }
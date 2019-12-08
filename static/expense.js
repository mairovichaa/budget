expenses.forEach(expense => expense.category = expense.category.trim())

let E = {};

E.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

E.getMonthName = monthNumber => new Date(null,monthNumber - 1).toLocaleString('en', { month: 'long' });

E.getMonths = () => {
    const months = expenses.map(e => e.date.slice(3));
    return [...new Set(months)]
};

E.totalByMonth = d3.nest()
    .key(expense => expense.date.slice('3'))
    .rollup(expensesForMonth => d3.sum(expensesForMonth, e => e.sum).toFixed(2))
    .object(expenses);

E.getTotalByMonth = month => E.totalByMonth[month];

E.getTotalByMonthAndYear = (month, year) => {
    console.log(`Get total by month = ${month} and year = ${year}`);
    if (month.length === 1){
        month = '0' + month;
    }
    return _.get(E.totalByMonth, `${month}.${year}`, 0);
};

E.expensesPerMonth = d3.nest()
    .key(expense => expense.date.slice('3'))
    .object(expenses);

E.expensesByMonth = month => _.get(E.expensesPerMonth, month, []);

E.totalPerCategoryByMonth = month => d3.nest()
    .key(expense => expense.category)
    .rollup(expenses => d3.sum(expenses, e => e.sum).toFixed(2))
    .object(E.expensesByMonth(month));

E.totalPerCategoryForMonthAndYear = (month, year) => {
    console.log(`Get total per category for month = ${month} and year = ${year}`);
    if (month.length === 1){
        month = '0' + month;
    }
    return E.totalPerCategoryByMonth(`${month}.${year}`);
};

E.getYear = expense => expense.date.slice(-4);

E.years = (() => {
    const notUniqueYears = expenses.map(E.getYear);
    return _.uniq(notUniqueYears);
})();

E.getYears = () => E.years;

E.yearToTotal = (() => {
    const yearToExpenses = _.groupBy(expenses, E.getYear);
    return _.mapValues(yearToExpenses,
            expenses => _.sumBy(expenses, e => e.sum).toFixed(2));
})();

E.getTotalByYear = year => E.yearToTotal[year];

E.getAverageByMonthForYear = year => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const amountOfPassedMonthes = year < currentYear ? 12 : today.getMonth() + 1;
    return (E.yearToTotal[year] / amountOfPassedMonthes).toFixed(2);
};

E.total = _.sum(expenses.map(e => e.sum)).toFixed(2);

E.getTotal = () => E.total;

E.getAnnualAverage = () => (E.getTotal() / E.getYears().length).toFixed(2);

E.categories = (() => {
    const notUniqueCategories = expenses.map(e => e.category);
    return _.uniq(notUniqueCategories);
})();

E.getCategories = () => E.categories;

E.categoryToTotal = (() => {
    const categoryToExpenses = _.groupBy(expenses, e => e.category);
    return _.mapValues(categoryToExpenses,
        expenses => _.sumBy(expenses, e => e.sum).toFixed(2));
})();

E.getTotalForCategory = category => E.categoryToTotal[category];

E.getAnnualAverageForCategory = category => (E.categoryToTotal[category] / E.getYears().length).toFixed(2);

E.getExpensesByYear = year => expenses.filter(e => Number.parseInt(E.getYear(e)) === year);

async function fetchData() {
    try {
      const response = await fetch('https://api.exemplo.com/dados');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os dados:', error);
    }
  }
  
  fetchData();
  
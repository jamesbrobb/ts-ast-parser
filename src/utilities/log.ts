

export function log(message: any, header?: string): void {
  console.log(`-----------${header || '-----------'}-----------`);
  console.log(message);
  console.log('----------------------------------');
}

export function logResults(results: any[]) {
  results.forEach(result =>
      console.log(JSON.stringify(Array.isArray(result) ? {result} : result, null, 2))
  );
}

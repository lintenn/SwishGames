export function formatDate( date ) {

  const d = new Date( date );
  return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + ( d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() );

}

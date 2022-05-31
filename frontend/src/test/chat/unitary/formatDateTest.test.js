import { formatDate } from '../../../components/chat/format/formatDate.js';

describe( 'formatDateTest', () => {

  test( 'prueba', () => {

    const date = new Date( '2020-01-01T00:00:00.000Z' );

    expect( formatDate( date ) ).toBe( '1-1-2020 1:00' );

  });

});

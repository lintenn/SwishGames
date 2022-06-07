import { formatDate } from '../../../components/chat/format/formatDate.js';

describe( 'formatDateTest', () => {

  test( 'prueba', () => {

    const date = new Date( '2022-05-30T15:56:20.000Z' );

    expect( formatDate( date ) ).toBe( '30-5-2022 17:56' );

  });

});

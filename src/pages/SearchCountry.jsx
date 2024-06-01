import {
  Container,
  CountryList,
  Heading,
  Loader,
  SearchForm,
  Section,
} from 'components';
import { fetchByRegion } from 'service/countryApi';
import { useEffect, useState } from 'react';

export const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState('');
  const onSearch = region => {
    setRegion(region);
  };

  useEffect(() => {
    if (!region) {
      return;
    }
    const searchCountry = async () => {
      setLoading(true);
      try {
        const countrySearch = await fetchByRegion(region);
        setCountries(countrySearch);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    searchCountry();
  }, [region]);
  return (
    <Section>
      <Container>
        {loading && <Loader />}
        <SearchForm onSearch={onSearch} />
        <Heading title={error} bottom />
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};

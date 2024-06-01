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
import { useSearchParams } from 'react-router-dom';

export const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = region => {
    setSearchParams({ region });
  };

  useEffect(() => {
    const region = searchParams.get('region');

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
  }, [searchParams]);
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

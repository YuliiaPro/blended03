import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/countryApi';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  return (
    <Section>
      <Container>
        {loading && <Loader />}
        {error && <Heading title={error} />}

        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};

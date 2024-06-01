import {
  Container,
  CountryInfo,
  GoBackBtn,
  Heading,
  Section,
} from 'components';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';
export const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState({});
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBackLink = useRef(location.state ?? '/');
  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetchCountry(countryId);
        setCountry(response);
      } catch (error) {
        setError(error.message);
      }
    };
    getCountry();
  }, [countryId]);
  return (
    <Section>
      <Container>
        <Heading title={error} bottom />
        <GoBackBtn pass={goBackLink.current}>Go back</GoBackBtn>
        <CountryInfo {...country} />
      </Container>
    </Section>
  );
};

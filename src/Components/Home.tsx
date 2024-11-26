import React from "react";
import { Container, Header, Segment, Grid } from "semantic-ui-react";

const Home: React.FC = () => {
  return (
    <div>
      <Container style={{ padding: "4em 0" }}>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Header as="h2">Nowości motoryzacyjne</Header>
                <p>
                  Świat motoryzacji ciągle się rozwija, wprowadzając nowe
                  technologie i modele samochodów. W ostatnich miesiącach na
                  rynku pojawiły się innowacyjne pojazdy elektryczne, które
                  obiecują zrewolucjonizować sposób, w jaki podróżujemy. Wśród
                  nich warto wymienić najnowszy model Tesli oraz nowy samochód
                  elektryczny od BMW, które zdobywają uznanie za swoje osiągi i
                  zasięg.
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h2">Recenzje samochodów</Header>
                <p>
                  Testując nowego Forda Mustanga, nie sposób nie zauważyć jego
                  imponującej mocy i stylowego wyglądu. Ten model, wyposażony w
                  najnowsze technologie, oferuje doskonałe wrażenia z jazdy,
                  zarówno dla miłośników sportowych osiągów, jak i codziennych
                  kierowców. Komfort i precyzja prowadzenia sprawiają, że
                  Mustang to samochód, który naprawdę robi wrażenie.
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Segment>
                <Header as="h2">Porady dla kierowców</Header>
                <p>
                  Regularne przeglądy techniczne są kluczowe dla utrzymania
                  samochodu w dobrym stanie. Należy pamiętać o wymianie oleju co
                  10,000 km, a także o sprawdzaniu stanu opon i hamulców.
                  Dbałość o regularne serwisowanie może znacząco wydłużyć
                  żywotność pojazdu i zapewnić bezpieczeństwo na drodze.
                  Pamiętaj także o utrzymaniu odpowiedniego poziomu płynów
                  eksploatacyjnych, takich jak płyn do spryskiwaczy i
                  chłodniczy.
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <Header as="h2">Historia motoryzacji</Header>
                <p>
                  Historia motoryzacji sięga końca XIX wieku, kiedy to Karl Benz
                  wynalazł pierwszy praktyczny samochód z silnikiem spalinowym.
                  Od tamtej pory przemysł samochodowy przeszedł ogromne zmiany,
                  wprowadzając coraz bardziej zaawansowane technologie.
                  Przełomowe momenty, takie jak wprowadzenie pasów
                  bezpieczeństwa, poduszek powietrznych i napędu hybrydowego,
                  przyczyniły się do poprawy bezpieczeństwa i wydajności
                  samochodów na całym świecie.
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

import React from "react";
import {
  PlatformStateContext,
  Grid,
  GridItem,
  HeadingText,
  AreaChart,
  TableChart,
  PieChart,
} from "nr1";
import { timeRangeToNrql } from "@newrelic/nr1-community";

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Nr1HowtoAddTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.accountId = "3056820";
  }
  render() {
    
    const contactEvent = `SELECT timestamp,email,name,message FROM Contact `;
    const donateEvent = `SELECT timestamp,organization,url FROM Donate `;
    const successfulEvent = `SELECT timestamp,path,form FROM Successful `;
    const errorEvent = `SELECT timestamp,path,form,error FROM ErrorEvent `;
    const countryEvent = `SELECT count(*) FROM Country FACET country `;
    const plantEvent = `SELECT count(*) FROM Plant FACET plant `;
    const plantSearchEvent = `SELECT count(*) FROM PlantSearch FACET country `;
    const airEvent = `SELECT count(*) FROM Air FACET country `;

    return (
      <PlatformStateContext.Consumer>
        {(PlatformState) => {
          /* Taking a peek at the PlatformState */
          const since = timeRangeToNrql(PlatformState);
          return (
            <>
              <Grid
                className="primary-grid"
                spacingType={[Grid.SPACING_TYPE.NONE, Grid.SPACING_TYPE.NONE]}
              >
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                      <b>Contact Form</b>
                    </HeadingText>
                    <TableChart
                      fullWidth
                      accountId={this.accountId}
                      query={contactEvent + since}
                    />
                  </main>
                </GridItem>
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                      <b>Donate Recommendations</b>
                    </HeadingText>
                    <TableChart
                      fullWidth
                      accountId={this.accountId}
                      query={donateEvent + since}
                    />
                  </main>
                </GridItem>
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                    <b>Successful Request</b>
                    </HeadingText>
                    <TableChart
                      fullWidth
                      accountId={this.accountId}
                      query={successfulEvent + since}
                    />
                  </main>
                </GridItem>
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                      <b>Error Request</b>
                    </HeadingText>
                    <TableChart
                      fullWidth
                      accountId={this.accountId}
                      query={errorEvent + since}
                    />
                  </main>
                </GridItem>
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                      <b>What country forest does user search the most?</b>
                    </HeadingText>
                    <PieChart
                      fullWidth
                      accountId={this.accountId}
                      query={countryEvent + since}
                    />
                  </main>
                </GridItem>
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                      <b>What plants does user click the most?</b>
                    </HeadingText>
                    <PieChart
                      fullWidth
                      accountId={this.accountId}
                      query={plantEvent + since}
                    />
                  </main>
                </GridItem>
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                      <b>What country does user check the air quality the most?</b>
                    </HeadingText>
                    <PieChart
                      fullWidth
                      accountId={this.accountId}
                      query={airEvent + since}
                    />
                  </main>
                </GridItem>
                <GridItem className="primary-content-container" columnSpan={6}>
                  <main className="primary-content full-height">
                    <HeadingText
                      spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                      type={HeadingText.TYPE.HEADING_4}
                    >
                      <b>What country or area does user check about the plants the most?</b>
                    </HeadingText>
                    <PieChart
                      fullWidth
                      accountId={this.accountId}
                      query={plantSearchEvent + since}
                    />
                  </main>
                </GridItem>
              </Grid>
            </>
          );
        }}
      </PlatformStateContext.Consumer>
    );
  }
}

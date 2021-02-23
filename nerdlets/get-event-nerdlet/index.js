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
    const avgResTime = `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `;
    const trxOverview = `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName `;
    const errCount = `FROM TransactionError SELECT count(*) as 'Transaction Errors' FACET error.message `;
    const responseCodes = `SELECT count(*) as 'Response Code' FROM Transaction FACET httpResponseCode `;
    const contactEvent = `SELECT timestamp,email,name,message FROM Contact `;
    const donateEvent = `SELECT timestamp,organization,url FROM Donate `;
    const successfulEvent = `SELECT timestamp,path,form FROM Successful `;
    const errorEvent = `SELECT timestamp,path,form,error FROM ErrorEvent `;

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
                    <PieChart
                      fullWidth
                      accountId={this.accountId}
                      query={responseCodes + since}
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
                    <PieChart
                      fullWidth
                      accountId={this.accountId}
                      query={errCount + since}
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

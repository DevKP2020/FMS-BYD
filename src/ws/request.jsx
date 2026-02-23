export const requestProbeMeasurement = ({
  tank,
}) => ({
  Protocol: "jsonPTS",
  Packets: [
    {
      Id: 1,
      Type: "ProbeGetMeasurements",
      Data: {
        Probe: tank,
      }
    }
  ]
});

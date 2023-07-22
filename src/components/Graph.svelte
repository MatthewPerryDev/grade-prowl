<script>
  import Chart from "svelte-frappe-charts";
  export let testData;
  testData= testData.slice(0,5)
  let data = {
    labels: testData.map((item) => item.professor),
    datasets: [
      {
        name: "A",
        values: testData.map((item) => item.A),
      },
      {
        name: "B",
        values: testData.map((item) => item.B),
      },
      {
        name: "C",
        values: testData.map((item) => item.C),
      },
      {
        name: "D",
        values: testData.map((item) => item.D),
      },
      {
        name: "F",
        values: testData.map((item) => item.F),
      },
      {
        name: "W",
        values: testData.map((item) => item.W),
      },
    ],
  };

  let barOptions = {
    stacked: true,
    spaceRatio: 0.2,
  };

  let tooltipOptions = {
    formatTooltipX: (d) => d.toUpperCase(),
    formatTooltipY: (d) => d * 100,
  };
</script>

<Chart {data} type="bar" {barOptions} maxSlices=20/>

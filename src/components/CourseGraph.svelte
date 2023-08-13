<script>
  import {
    VisXYContainer,
    VisStackedBar,
    VisAxis,
    VisBulletLegend,
    VisTooltip,
  } from "@unovis/svelte";
  import { StackedBar } from "@unovis/ts";

  /** @type {import('./$types').PageData} */
  export let data;
  let screenSize;
  let maxInstructors = Math.min(data.length,5);
  data = data.sort((a, b) => a.Year > b.Year);

  let test = data.slice(0, maxInstructors);

  $: if (screenSize >=1024) {
    console.log(screenSize);
    maxInstructors =  Math.min(data.length,20);
  }
  
  $: if (screenSize>= 768 && screenSize <1024) {
    console.log(screenSize);
    maxInstructors =  Math.min(data.length,10);
  }  
  
  $: test = data.slice(0, maxInstructors);
  const numberFormat = Intl.NumberFormat("en-US", {
    style: "percent",
    notation: "compact",
  }).format;
  
  const tickFormat = (i) => test[i].Instructor;
  
  const x = (prof, i) => i;
  let y = [
    (prof) => prof.A,
    (prof) => prof.B,
    (prof) => prof.C,
    (prof) => prof.D,
    (prof) => prof.F,
    (prof) => prof.W,
  ];
  let items = [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "F" },
    { name: "W" },
  ];
  let triggers = {
    [StackedBar.selectors.bar]: (d) =>
      `<span>${d.Instructor}<br/>A: ${numberFormat(d.A)}<br/>B: ${numberFormat(
        d.B
      )}<br/>C: ${numberFormat(d.C)}<br/>D: ${numberFormat(
        d.D
      )}<br/>F: ${numberFormat(d.F)}<br/>W: ${numberFormat(d.W)}<br/></span>`,
  };
  if (test[0].P > 0 || test[0]["F(P)"] > 0) {
    y = [(prof) => prof.P, (prof) => prof["F(P)"], (prof) => prof.W];
    items = [{ name: "P" }, { name: "F(P)" }, { name: "W" }];
    triggers = {
      [StackedBar.selectors.bar]: (d) =>
        `<span>${d.Instructor}<br/>P: ${numberFormat(
          d.P
        )}<br/>F(P): ${numberFormat(d["F(P)"])}<br/>W: ${numberFormat(
          d.W
        )}<br/></span>`,
    };
  }
  const margin = { top: 0, bottom: 0, left: 0, right: 0 };
</script>

<svelte:window bind:innerWidth={screenSize} />

<VisBulletLegend {items} labelMaxWidth="20px" labelFontSize="small" />
<VisXYContainer
  padding={{ left: 10, right: 10 }}
  scaleByDomain="true"
  data={test}
  {margin}
>
  <VisTooltip {triggers} />
  <VisStackedBar {x} {y} />
  <VisAxis
    label="Professors"
    type="x"
    tickTextSeparator=" "
    tickTextWidth={20}
    tickTextTrimType="end"
    tickValues={[...Array(maxInstructors).keys()]}
    {tickFormat}
  />
  <VisAxis label="Percentage" type="y" />
</VisXYContainer>



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
    let count = 0;
    let test = [];
    for (const teach of data) {
      test.push(teach);
      count++;
    }
    test = test.sort((a, b) => a.Year > b.Year);
    test = test.splice(0, 20);
  
    const numberFormat = Intl.NumberFormat("en-US", {
      style: "percent",
      notation: "compact",
    }).format;
    const tickFormat = (i) => data[i].professor;
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
        `<span>${d.professor}<br/>A: ${numberFormat(d.A)}<br/>B: ${numberFormat(
          d.B
        )}<br/>C: ${numberFormat(d.C)}<br/>D: ${numberFormat(
          d.D
        )}<br/>F: ${numberFormat(d.F)}<br/>W: ${numberFormat(d.W)}<br/></span>`,
    };
    if (test[0].P > 0 || test[0]["F(P)"] > 0) {
      y = [(prof) => prof.P, (prof) => prof["F(P)"],(prof) => prof.W];
      items = [{ name: "P" }, { name: "F(P)" },{ name: "W" }];
      triggers = {
        [StackedBar.selectors.bar]: (d) =>
          `<span>${d.professor}<br/>P: ${numberFormat(
            d.P
          )}<br/>F(P): ${numberFormat(d["F(P)"])}<br/>W: ${numberFormat(
            d.W
          )}<br/></span>`,
      };
    }
    const margin = { top: 0, bottom: 25, left: 0, right: 0 };
  </script>
<style>
    :root {
  --vis-color0: #90d8ac;
  --vis-color1: #b5e5c7;
  --vis-color2: #f56600;
  --vis-color3: #fcc4b5;
  --vis-color4: #bcb5f9;
  --vis-color5: #988ef4;
}
    </style>
    
  <VisBulletLegend {items} labelMaxWidth="20px" labelFontSize="small" />
  <VisXYContainer data={test} {margin}>
    <VisTooltip {triggers} />
    <VisStackedBar {x} {y} />
    <VisAxis
      label="Professors"
      type="x"
      tickTextSeparator=" "
      tickTextWidth={20}
      tickTextTrimType="end"
      tickValues={[...Array(count).keys()]}
      {tickFormat}
    />
    <VisAxis label="Percentage" type="y" />
  </VisXYContainer>
  
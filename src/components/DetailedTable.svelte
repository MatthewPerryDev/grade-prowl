<script lang="ts">
    import { DataHandler } from '@vincjo/datatables'
    import Th from './table/Th.svelte'
    import Search from './table/search.svelte';
    import Pagination from './table/pagination.svelte';
        /** @type {import('./$types').PageData} */
    export let data;
    export let columns;
    const handler = new DataHandler(data, { rowsPerPage: 15 })
    const rows = handler.getRows()
    console.log(columns);
</script>
<header>
    <Search {handler} />
</header>

<table class="table table-zebra table-sm w-full">
    <thead>
        <tr>
            
            <Th {handler} orderBy="professor">Professor</Th>
            <Th {handler} orderBy="A">A</Th>
            <Th {handler} orderBy="B">B</Th>
            <Th {handler} orderBy="C">C</Th>
            <Th {handler} orderBy="D">D</Th>
            <Th {handler} orderBy="F">F</Th>
            <Th {handler} orderBy="W">W</Th>
            <Th {handler} orderBy="P">P</Th>
            <Th {handler} orderBy="F(P)">F(P)</Th>

        </tr>
    </thead>
    <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.professor}</td>
                <td>{row.A.toFixed(2)}</td>
                <td>{row.B.toFixed(2)}</td>
                <td>{row.C.toFixed(2)}</td>
                <td>{row.D.toFixed(2)}</td>
                <td>{row.F.toFixed(2)}</td>
                <td>{row.W.toFixed(2)}</td>
                <td>{row.P.toFixed(2)}</td>
                <td>{row["F(P)"].toFixed(2)}</td>
            </tr>
        {/each}
    </tbody>
</table>
<footer>
    <Pagination {handler} />
</footer>
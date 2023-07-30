<script>
    export let data;
    import Typeahead from 'svelte-typeahead';
    const extract = (item) => item.fullName;
</script>

<Typeahead hideLabel limit={5} {data} {extract} on:select={(item)=>location.href = `/courses/${item.detail.original.route}`}/>

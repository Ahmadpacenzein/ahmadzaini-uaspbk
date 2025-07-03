<template>
  <div class="history-container">
    <h1>History</h1>
    <ul>
      <li>Sample history item 1</li>
      <li>Sample history item 2</li>
      <li>Sample history item 3</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "History"
};
</script>

<style scoped>
.history-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 15px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  color: #555;
}
</style>

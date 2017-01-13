
const handleData = ((error, response) => {
  if (error) {
    console.log(error, "error getting it ALL");
  } else {
    response.hits.hits.forEach(function (hit) {
      const product = hit._source;
      // product._id = product.metafields[2].value;
      searchData.push(product);
    });
    if (response.hits.total > searchData.length) {
      client.scroll({
        scrollId: response._scroll_id,
        scroll: "30s"
      }, handleData);
    } else {
      console.log("every product!", searchData[2]);
      const newData = JSON.stringify(searchData)
    } if (err) {
        console.loading(error, "Bypassing loading Products default data.");
      }
    }

});

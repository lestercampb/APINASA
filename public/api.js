const baseURL = 'https://api.nasa.gov/DONKI/notifications' ; 
const key = 'vwdwEMT51qesJLuqNFyYv4c66Y9vDSbk8xRjxxut';
const type = 'FLR'; //this is used to filter all warnings to include only solar flare warnings 
let url;

//WILL NEED TYPE=FLR IN URL (start date, end date, flr, then api key)
//example: https://api.nasa.gov/DONKI/notifications?startDate=2015-05-01&endDate=2015-05-08&type=FLR&api_key=vwdwEMT51qesJLuqNFyYv4c66Y9vDSbk8xRjxxut

//SEARCH ITEM
const startDate = document.querySelector('.start-date');
const submitBtn = document.querySelector('.submit');
const searchForm = document.querySelector('form');

//RESULTS NAVIGATION
const section = document.querySelector('section');

//ADD EVENT LISTENERS
searchForm.addEventListener('submit', fetchResults);

let results = 0;

//ACCESS THE API
function fetchResults(e) {
    e.preventDefault(); //prevents the default nature of 
    //the form (prevents submitting data and sending post request)
 //if(section.hasChildNodes()) {
   //console.log(section.hasChildNodes());
  //while (section.hasChildNodes()){
    //section.removeChild(section.firstElementChild);
  
    //provides a no results message when no items are returned.
    //added this above the json to work around an error that is 
    //returned from the API when no results are present (stops all forward movement in code)
   let noResults = document.createElement('h5');
   section.appendChild(noResults);
  noResults.textContent = 'No flare warnings issued within 30 days';
 
 //else{
    



/*The API requires no more than 30 days of information to be requested, and an 
end date must also be provided.  Since the number of warning-required solar flares 
in one month is small, I determined a simple input of one date should request 
30 days range of results.

In order to do this, I first needed to add 30 days to the inputted startDate.value.

First I changed the startDave value to milliseconds with the "parse" function.
*/
    let msec = Date.parse(startDate.value); 
    //Next I added 30 days of milliseconds to the parsed value.
    let newmsec= msec + 2592000000;
    //finally I put the added value into another value and changed the format
    //of the date with the Date constructor. 
    let end = new Date(newmsec);

    //this resulted in the proper date, but the format included minutes and seconds
    //while the API requires a simple YYYY-MM-DD format.
    
    //So, below I added a function to get the end date in the proper YYYY-MM-DD format.
    function getEndDate(n) {
        var year = n.getFullYear(); //returns year as 4 digits
      
        var month = (1 + n.getMonth()).toString(); //getMonth returns month, but month 1 is 0 so add 1
        month = month.length > 1 ? month : '0' + month; //adds a zero to beginning of month if month is 1 digit
      
        var day = n.getDate().toString(); //gets day of the month
        day = day.length > 1 ? day : '0' + day; //adds a zero to beginning of day if there's only 1 digit for day
        
        //return required to access variable later in code
        return endDate = year + '-' + month + '-' + day;
      }
      getEndDate(end);

    

    console.log(endDate);
    
    //assemble the full URL
    url = baseURL + '?startDate=' + startDate.value + '&endDate=' + endDate + '&type=' + type + '&api_key=' + key ;
    console.log(url);
      fetch(url)
      .then(response => response.json()
              ) //gets network resource with a promise and converts it to a json object with .json()
      .then(function(json){
      console.log(json);
      
      displayResults(json);
        
      })
      
      //--Display results
        function displayResults(json) {
          while (section.firstChild) {
            section.removeChild(section.firstChild);
          }
          let results = json.length;
          console.log(results); //checks the number of results present

          if(results === 0) {
            console.log("No results"); //attempt here to show no results in console
          } else {

            for(let i = 0; i < results; i++ ){
              console.log(i);
             

              //-----DOM CONTAINER
              let result = document.createElement('article');
              let date = document.createElement('h5');
              let para = document.createElement('p');
              let link = document.createElement('a');

              

              result.appendChild(para);
              section.appendChild(result);
              result.appendChild(date);
              result.appendChild(link);
              
              let current = i;
              console.log("Current: ", current);
              let array = json;
              console.log(array);
              console.log(array[i]);
              console.log(array[i].messageID);

              date.textContent = `Solar Flare Warning Issued:  ${array[i].messageIssueTime}`;
              link.href = array[i].messageURL
              link.textContent = 'CLICK HERE TO VIEW WARNING'
              
            }
          }
        }
    
    
      }

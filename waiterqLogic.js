module.exports = function waiters(pool){

    var store = [];
    var  database

    var count = 0;
     async function addWaiters(name){
            var waiterNames = name.toLowerCase()
                if(store[waiterNames] === undefined){
                    store[waiterNames] = 0;
                }
            
            waiterNames =   waiterNames.charAt(0).toUpperCase() +   waiterNames.slice(1);
           
             database = await pool.query('Select * waiters WHERE  = $1', [waiterNames]);
         if(database.rowCount === 1){   
             await pool.query('UPDATE weekdays SET count = count + 1 WHERE weekdays = $1' , [waiterNames]);
            
         }
         else{
            await pool.query('insert into waiters (names , weekdays_id ) values($1 , $2)',[waiterNames, weekdays_id] );
         }

       
         
        
     }
     
     return{
        addWaiters,

     }

}
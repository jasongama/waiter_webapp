module.exports = function waiters(pool){

    var store = [];
    var  waiters;

    var count = 0;
     async function addWaiters(name){
            var waiterNames = name.toLowerCase()
                if(store[waiterNames] === undefined){
                    store[waiterNames] = 0;
                }
            
            waiterNames =   waiterNames.charAt(0).toUpperCase() +   waiterNames.slice(1);
           
            waiters = await pool.query('Select * waiters WHERE  names = $1', [waiterNames]);
         
             let getWaiter = waiters.rowCount
             if (getWaiter === 0) {
               await pool.query('insert into waiters_table(waiter_name) values($1)', [waiterNames])
             }
        
     }
     
     return{
        addWaiters,

     }

}
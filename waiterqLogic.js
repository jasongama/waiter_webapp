module.exports = function waiters(pool){

    var store = [];
    var  waiters;

    var count = 0;
     async function addWaiters(name){

    var waiterNames = name.toUpperCase();
    waiters = await pool.query('Select * from waiters WHERE  names = $1', [waiterNames]);
     let getWaiter = waiters.rowCount
     if (getWaiter === 0) {
    
       await pool.query('insert into waiters(names) values($1)', [waiterNames])
     }  
    
        
     }
     
     return{
        addWaiters,
        
     }

}
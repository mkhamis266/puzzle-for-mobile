

const theUrl= 'https://puzzle-game-a3c05-default-rtdb.firebaseio.com/players.json';
const delUrl= 'https://puzzle-game-a3c05-default-rtdb.firebaseio.com/players/';
const resultsContainer = document.querySelector('.results-container');
const emptyMessageElm = document.getElementById('emptyMessage')
const playersData = [];

window.onload = function(){
  getPlayersReports();
}


function getPlayersReports()
{
    $.ajax({
      type: "Get",
      url: theUrl,
      success: function (players) {
        if(!players){
          emptyMessageElm.classList.remove('d-none')
        }else{
          emptyMessageElm.classList.add('d-none')
          for(const playerId in players){
            playersData.push({
              playerId:playerId,
              fullName:players[playerId]['fullName'],
              email:players[playerId]['email'],
              score:players[playerId]['score'],
            })
          }
          playersData.sort( compare );
          createPlayersTable();
        }
      },
    });
}


function deletePlayer(playerId){
  url = delUrl+'/'+playerId+'.json';
  $.ajax({
    type:"DELETE",
    url:url,
    success: function () {
      $('.tr_'+playerId).remove();
    },
  })
}


function createPlayersTable(){
    playersData.forEach((player,i)=>{
      const playerElm = document.createElement('tr');
      playerElm.classList.add('tr_'+player.playerId)
      playerElm.innerHTML = `
                <td scope="row">${i+1}</td>
                <td >${player['fullName']}</td>
                <td>${player['email']}</td>
                <td>${player['score']}</td>
                <td><button onclick='onDeletePlayer("${player.playerId}")' class="btn btn-danger" type="button">delete</button></td>
      `
      resultsContainer.append(playerElm);
    }) 
}

function onDeletePlayer(playerId){
  const deleteConfirmed = confirm("Are you sure you want to delete this player?")
  if(deleteConfirmed){
    deletePlayer(playerId)
  }
}

function download(){
  const modifiedData = playersData.map((player)=>{
    delete player.playerId;
    return player
  })
  filename='game report.xlsx';
  const ws = XLSX.utils.json_to_sheet(modifiedData)
  var wb = XLSX.utils.book_new();

  /* Export to file (start a download) */
  XLSX.utils.book_append_sheet(wb, ws, "players");
  XLSX.writeFile(wb,filename);
}

function compare( a, b ) {
  if ( a.score < b.score ){
    return 1;
  }
  if ( a.score > b.score ){
    return -1;
  }
  return 0;
}
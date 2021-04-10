# catJAM API Documentation
## GraphQL Queries
- description: queries the GraphQL server with the given query
- request: `POST /graphql`
    - content-type: `application/json`
    - body: object
      - query: (string) the GraphQL query string
- response: 200
    - content-type: `application/json`
    - body: object
      - data: (object) the json object that the query result from the GraphQL server 
``` 
$ curl -X POST  https://www.project-catjam.me/login 
  	-H "Content-Type: application/json" 
   	 -d "{\"username\":\"a\", \"password\":\"a\"}"
$ curl -X POST -H "Content-Type: `application/json`" -d '{"query":"query string here"} --cookie "jwt=token from previous curl request" https://www.project-catjam.me/graphql
```

### getSongById
- description: retrieve song given its database ID `_id)`
- request body example: 
 ```
query {
  getSongById(_id:"606f750f76ec220015956f97") {
    _id
    songName
    artist
    filepath
    lyrics
  }
}
```
- response body example: 
```
{
  "data": {
    "getSongById": {
      "_id": "606f750f76ec220015956f97",
      "songName": "Shinzou wo Sasageyo",
      "artist": "Linked Horizon",
      "filepath": "https://c09.s3.us-east-2.amazonaws.com/4c5e9734-7ff0-47c1-89b1-278bb5b19952",
      "lyrics": "[00:03.44](Opfert eure Herzen!)\\n\\n[00:06.33]Kore ijou no jigoku wa\\n[00:08.99]Nai darou to shinjitakatta\\n[00:12.71]Saredo jinrui saiaku no hi wa\\n[00:15.24]Itsumo toutotsu ni\\n\\n[00:18.15]Tobira o tataku oto wa\\n[00:21.30]Taezu hidoku busahou de\\n[00:24.22]Manukarezaru saiyaku no hi wa\\n[00:26.90]Akumu no you ni\\n\\n[00:30.55]Sugishi hi o aragau mono\\n[00:33.18]Yatsura wa kuchiku subeki teki da\\n[00:36.40]Ano hi donna kao de hitomi de\\n[00:39.58]Oretachi o mitsumeteita?\\n[00:42.45]Nani o sutereba akuma o mo shinogeru?\\n[00:45.33]Inochi sae tamashii sae kesshite oshiku wa koenai\\n\\n[00:51.03]Sasageyo! Sasageyo!\\n[00:53.98]Shinzou wo sasageyo!\\n[00:57.23]Subete no gisei wa ima, kono toki no tame ni\\n[01:03.14]Sasageyo! Sasageyo!\\n[01:06.55]Shinzou wo sasageyo!\\n[01:09.37]Susumu beki mirai wo\\n[01:12.15]Sono te de kirihirake!"
    }
  }
}
```
### getAllSongs
- description: retrieve all songs 
- request body example:
```
query {
  getAllSongs {
    _id
    songName
    artist
    filepath
    lyrics
  }
}
```
- response body example:
```
{
  "data": {
    "getAllSongs": [
      {
        "_id": "606868de23b5573124eb6617",
        "songName": "Unravel",
        "artist": "TK from Ling tosite sigure",
        "filepath": "https://c09.s3.us-east-2.amazonaws.com/e8441e36-1553-46f5-808f-01495c77e440",
        "lyrics": "[00:00.99]Oshiete oshiete yo sono shikumi wo\\n[00:07.53]Boku no naka ni dare ga iru no?\\n[00:14.76]Kowareta kowareta yo kono sekai de\\n[00:21.76]Kimi ga warau nanimo miezu ni\\n[00:41.54]Kowareta boku nante sa iki wo tomete\\n[00:48.26]Hodokenai mou hodokenai yo shinjitsu sae\\n[00:54.79]Freeze\\n[00:55.51]Kowaseru kowasenai kurueru kuruenai\\n[00:59.25]Anata wo mitsukete yureta\\n[01:03.02]Yuganda sekai ni dan dan boku wa sukitootte mienaku natte\\n[01:06.50]Mitsukenaide boku no koto wo mitsumenaide\\n[01:17.01]Dareka ga egaita sekai no naka de anata wo kizutsuketaku wa nai yo\\n[01:24.03]Oboeteite boku no koto wo azayaka na mama\\n[01:42.01]Mugen ni hirogaru kodoku ga karamaru mujaki ni waratta kioku ga sasatte\\n[01:48.79]Ugokenai ugokenai ugokenai ugokenai ugokenai ugokenai yo\\n[01:55.25]Unravelling the world!\\n[02:22.51]Kawatte shimatta kaerarenakatta\\n[02:28.02]Futatsu ga karamaru futari ga horobiru\\n[02:31.76]Kowaseru kowasenai kurueru kuruenai\\n[02:35.51]Anata wo kegasenai yo yureta\\n[02:39.01]Yuganda sekai ni dan dan boku wa sukitootte mienaku natte\\n[02:46.02]Mitsukenaide boku no koto wo mitsumenaide\\n[02:53.03]Dareka ga shikunda kodoku na wana ni mirai ga hodokete shimau mae ni\\n[03:00.27]Omoidashite boku no koto wo azayaka na mama\\n[03:11.54]Wasurenaide wasurenaide wasurenaide wasurenaide\\n[03:17.76]Kawatte shimatta koto ni paralyze\\n[03:21.50]Kaerarenai koto darake no paradise\\n[03:25.01]Oboeteite boku no koto wo\\n[03:35.78]Oshiete oshiete boku no naka ni dare ga iru no?"
      },
      {
        "_id": "60686a6423b5573124eb6618",
        "songName": "Ranbu no Melody",
        "artist": "SID",
        "filepath": "https://c09.s3.us-east-2.amazonaws.com/3838d856-9fb1-4878-b7a1-858c0cc650d6",
        "lyrics": "[00:00.69]Shizuka ni shizuka ni maku wa kiri otoshi\\n[00:05.42]Kakusei no yoake ni aoi honou\\n[00:31.67]Miwatasu kagiri no yami to katto wo te saguri no hibi\\n[00:41.67]Bokura wa make wo shiranai yowasa wo\\n[00:48.42]Dakishime aruita\\n[00:51.93]Atarashii kiba de jidai wo kizame\\n[01:04.17]Shizuka ni shizuka ni baku wa kiri otoshi\\n[01:09.17]Kakusei no yoake ni aoi honou\\n[01:14.17]Mamoritai anata ni deaeru sono hi made wa\\n[01:20.18]Yuushu no biyori me no mae no teki wo\\n[01:36.41]Kokoro ni kotoba hoko saki subete wo nomi komi aruita\\n[01:46.92]Tsukareta hushin wa jishin ni neji make\\n[01:59.17]Kurushikute nige takute maga sashita mirai wa\\n[02:04.43]Yume egaita bokura to tooi tokoro de\\n[02:09.42]Jikan nante hosou nante kechi rashite hohoenda\\n[02:15.17]Ano koro nani mo kowaku nakatta ro?\\n[02:39.17]Shizuka ni shizuka ni maku wa kiri otoshi\\n[02:44.17]Kakusei no yoake ni aoi honou\\n[02:49.42]Mamoritai anata ni deaeru sono hi made wa\\n[02:55.17]Yuushu no biyori me no mae no teki wo\\n[02:59.18]Itoshikute itoshikute hoka ni wa nani mo nakute\\n[03:04.17]Koko kara miwatashita keshiki zenbu\\n[03:09.42]Matomete tsurete itte ageru sa hanasanai de\\n[03:15.17]Zutto nari yamanu ranbu no melody"
      }
    ]
 }
}

```

### getPlaylistById
- retrieve playlist given database id `_id`
- request body example:
```
query {
  getPlaylistById(_id: "606c90a58a0566336470af24") {
    title
    user
  }
}
```
- response body example:
```
{
  "data": {
    "getPlaylistById": {
      "title": "Alright long name of playlist",
      "user": "Glenn",
      "songs": [
        {
          "songName": "Karma",
          "artist": "BUMP OF CHICKEN",
          "lyrics": "[00:20.14]Garasu tama hitotsu otosareta\\n[00:22.48]Oikakete mou hitotsu okkochita\\n[00:25.15]Hitotsu bun no hidamari ni\\n[00:27.73]Hitotsu dake nokotteru\\n[00:30.04]Shinzou ga hajimatta toki\\n[00:32.36]Iya demo hito wa basho wo toru\\n[00:35.13]Ubawarenai you ni mamori suzuketeru\\n[00:39.58]Yogosazu ni tamotte kita\\n[00:41.80]Te demo yogorete mieta\\n[00:44.12]Kioku wo utagau mae ni\\n[00:46.80]Kioku ni utagawareteru\\n[00:49.89]Kanarazu bokura wa deau darou\\n[00:54.18]Onaji kodou no oto wo mejirushi ni shite\\n[00:59.23]Koko ni iru yo itsu datte yonderu kara\\n[01:04.25]Kutabireta riyuu ga kasanatte yureru toki\\n[01:09.13]Umareta imi wo shiru\\n[01:12.02]Sonzai ga suzuku kagiri\\n[01:14.37]Shikata nai kara basho wo toru\\n[01:17.00]Hitotsu bun no hidamari ni\\n[01:19.33]Futatsu wa chotto hairenai\\n[01:22.07]Garasu tama hitotsu otosareta\\n[01:24.43]Ochita toki nanika hajikidashita\\n[01:26.77]Ubaitotta basho de\\n[01:28.71]Hikari wo abita\\n[01:31.00]Kazoeta ashiato nado\\n[01:33.50]Kizukeba suuji de shikanai\\n[01:36.37]Shiranakya ikenai koto wa\\n[01:38.51]Douyara ichi to zero no aida\\n[01:41.71]Hajimete bokura wa deau darou\\n[01:46.57]Onaji himei no hata wo mejirushi ni shite wasurenaide\\n[01:53.77]Itsu datte yonderu kara\\n[01:56.28]Kasaneta riyuu wo futari de umeru toki\\n[02:01.00]Yakusoku ga kawasareru\\n[02:03.66]Kagami nanda bokura tagai ni\\n[02:09.60]Sorezore no KARUMA wo utsusu tame no\\n[02:14.25]Yogoreta te to te de sawariatte\\n[02:19.56]Katachi ga wakaru\\n[02:23.12]Koko ni iru yo\\n[02:26.00]Tashika ni sawareruyo\\n[02:28.38]Hitori bun no hidamari ni\\n[02:31.21]Bokura wa iru\\n[02:33.03]Wasurenaide\\n[02:35.92]Itsu datte yonderu kara\\n[02:38.12]Onaji garasu tama no uchigawa no hou kara\\n[02:43.09]Sousa kanarazu bokura wa deau darou\\n[02:47.97]Shizumeta riyuu ni jyuujika wo tateru toki\\n[02:53.07]Yakusoku wa hatasareru\\n[02:57.78]Bokura wa hitotsu ni naru"
        },
        {
          "songName": "Shinzou wo Sasageyo",
          "artist": "LINKED HORIZON",
          "lyrics": "[00:03.44](Opfert eure Herzen!)\\n\\n[00:06.33]Kore ijou no jigoku wa\\n[00:08.99]Nai darou to shinjitakatta\\n[00:12.71]Saredo jinrui saiaku no hi wa\\n[00:15.24]Itsumo toutotsu ni\\n\\n[00:18.15]Tobira o tataku oto wa\\n[00:21.30]Taezu hidoku busahou de\\n[00:24.22]Manukarezaru saiyaku no hi wa\\n[00:26.90]Akumu no you ni\\n\\n[00:30.55]Sugishi hi o aragau mono\\n[00:33.18]Yatsura wa kuchiku subeki teki da\\n[00:36.40]Ano hi donna kao de hitomi de\\n[00:39.58]Oretachi o mitsumeteita?\\n[00:42.45]Nani o sutereba akuma o mo shinogeru?\\n[00:45.33]Inochi sae tamashii sae kesshite oshiku wa koenai\\n\\n[00:51.03]Sasageyo! Sasageyo!\\n[00:53.98]Shinzou wo sasageyo!\\n[00:57.23]Subete no gisei wa ima, kono toki no tame ni\\n[01:03.14]Sasageyo! Sasageyo!\\n[01:06.55]Shinzou wo sasageyo!\\n[01:09.37]Susumu beki mirai wo\\n[01:12.15]Sono te de kirihirake!"
        },
        {
          "songName": "Hacking to the Gate",
          "artist": "Kanako Itou",
          "lyrics": "[00:12.90]Sū jū oku mo no kodō no kazu sae\\n[00:19.14]Anata ni wa mabataki-teido no sajina tōkyū\\n[00:25.90]Kako ni torawarete mirai mo nageku mo\\n[00:30.89]Chiri hitotsu gosan o yurusanu hitsuzen\\n[00:36.65]Mugen ni hirogaru yume mo egaku mirai mo\\n[00:43.15]Bokutachi ni yurusa reta kyoei no genri\\n[00:48.64]Yūgen sore wa futatsu no hari ga shimesu\\n[00:54.90]Zankokuna yakujō to sentaku e\\n[00:59.89]Hacking to the Gate!\\n[01:01.90]Dakara ima ichi-byō-goto ni sekai-sen o koete\\n[01:08.15]Kimi no sono egao mamoritai no sa\\n[01:13.90]Soshite mata kanashimi no nai jikan no rūpu e to\\n[01:20.65]Nomikoma rete iku kodoku no kansoku-sha\\n[01:42.64]Inochi no shuchō to muimi no shōmei\\n[01:48.40]Anata ni wa taikutsu shinogi ni taranu kōkei\\n[01:55.40]Shihai-sha kidori no orokana shuzoku wa\\n[02:00.39]Unuboreta chisetsuna teiri o narabeta\\n[02:06.15]Mugen to shinjita ai mo sora no kanata mo\\n[02:12.64]Bokutachi ni shimesa reta kasō no jiyū\\n[02:18.14]Yūgen sore wa mujihi ni toki o kizami\\n[02:24.40]Ashita sae mo hitei suru sentaku e\\n[02:29.15]Hacking to the Gate!\\n[02:31.40]Ikutsu mo no kagayakeru hibi nakama to no yakusoku\\n[02:37.89]Nakatta koto ni wa shite wa ikenai\\n[02:43.39]Sono tame ni toki o azamuku nokosa reta shikake ni\\n[02:50.39]Mō mayoi wa nai kodoku no kansoku-sha\\n[03:35.77]Dakara ima ichi-byō-goto ni sekai-sen o koete\\n[03:43.77]Kimi no sono egao mamoritai no sa\\n[03:49.02]Soshite mata kanashimi no nai jikan no rūpu e to\\n[03:55.76]Nomikoma rete iku kodoku no kansoku-sha"
        }
      ]
    }
  }
}
```

### getPlaylistsByUser:
- description: retrieve all playlists of user `username`
- request body example:
```
query {
  getPlaylistsByUser(username:"a") {
    _id
    title
    user
  }
}
```
- response body example:
```
{
  "data": {
    "getPlaylistsByUser": [
      {
        "_id": "606f6a1022f5200015e1a9df",
        "title": "test",
        "user": "a",
        "songs": [
          {
            "songName": "All Alone With You",
            "artist": "EGOIST"
          },
          {
            "songName": "Rolling Star",
            "artist": "YUI"
          },
          {
            "songName": "Unravel",
            "artist": "TK from Ling tosite sigure"
          },
          {
            "songName": "Ranbu no Melody",
            "artist": "SID"
          },
          {
            "songName": "Pride Kakumei",
            "artist": "CHiCO with HoneyWorks"
          },
          {
            "songName": "Black Rover",
            "artist": "Vickeblanka"
          },
          {
            "songName": "My Dearest",
            "artist": "Supercell"
          },
          {
            "songName": "Blue Bird",
            "artist": "Ikimono-gakari"
          },
          {
            "songName": "Refrain ",
            "artist": "Aimer"
          },
          {
            "songName": "Karma",
            "artist": "BUMP OF CHICKEN"
          },
          {
            "songName": "Homura",
            "artist": "LiSA"
          },
          {
            "songName": "Catch the Moment",
            "artist": "LiSA"
          },
          {
            "songName": "Sekai wa Koi ni Ochiteiru",
            "artist": "CHiCO with HoneyWorks"
          },
          {
            "songName": "Uso no Hibana",
            "artist": "96neko"
          },
          {
            "songName": "Touch Off",
            "artist": "UVERworld"
          },
          {
            "songName": "Daisy",
            "artist": "STEREO DIVE FOUNDATION"
          },
          {
            "songName": "Kaen",
            "artist": "Ziyoou-vachi"
          },
          {
            "songName": "Serendipity",
            "artist": "ZAQ"
          },
          {
            "songName": "Neo-Aspect",
            "artist": "Roselia"
          },
          {
            "songName": "Hana ni Bourei",
            "artist": "Yorushika"
          },
          {
            "songName": "Kaleidoscope",
            "artist": "ChouCho"
          },
          {
            "songName": "Departures",
            "artist": "EGOIST"
          },
          {
            "songName": "KAIKAIKITAN",
            "artist": "Eve"
          },
          {
            "songName": "夜に駆ける",
            "artist": "YOASOBI"
          },
          {
            "songName": "STYX HELIX",
            "artist": "MYTH & ROID"
          },
          {
            "songName": "Hacking to the Gate",
            "artist": "Kanako Itou"
          }
        ]
      },
      {
        "_id": "6070a15376ec220015956fae",
        "title": "hi",
        "user": "a",
        "songs": []
      },
      {
        "_id": "6071c38de6335d34706b8261",
        "title": "Long playlist",
        "user": "a",
        "songs": []
      },
      {
        "_id": "60722c99c1c51000155aabeb",
        "title": "a",
        "user": "a",
        "songs": []
      }
    ]
  }
}

```
### getAllRooms
- description: retrieves all karaoke rooms
- request body example:
```
query {
  getAllRooms {
    _id
  }
}
```
- response body example:
```
{
  "data": {
    "getAllRooms": [
      {
        "_id": "605ca294d20a142da42ef768"
      },
      {
        "_id": "605cb32b8322d33a489ca78b"
      },
      {
        "_id": "605d237ab073250015229d81"
      },
      {
        "_id": "605d2391b073250015229d82"
      },
      {
        "_id": "605dd6db947b93136848e9bf"
      },
      {
        "_id": "606625019e23560e8cb45c3c"
      }
    ]
  }
}
```

### addSong
- description: add song to the app given song name `songName`, artist(s) `artist`, song file url `filepath`, and lyrics `lyrics`
- request body example: 
```
mutation {
  addSong(songName:"a", artist:"a", filepath:"https://c09.s3.us-east-2.amazonaws.com/a53001fa-dee4-427f-a093-95493b5ab8a5", lyrics:"a") {
    songName
    artist
    filepath
    lyrics
  }
}
```
- response body example:
```
{
  "data": {
    "addSong": {
      "songName": "a",
      "artist": "a",
      "filepath": "https://c09.s3.us-east-2.amazonaws.com/a53001fa-dee4-427f-a093-95493b5ab8a5",
      "lyrics": "a"
    }
  }
}

```

### deleteSongById
- description: delete song given its database id `_id`
- request body example:
```
mutation {
  deleteSongById(_id: "6072312ec1c51000155aabf2") {
    songName
    artist
    filepath
    lyrics
  }

}
```
- response body example:
```
{
  "data": {
    "deleteSongById": {
      "songName": "a",
      "artist": "a",
      "filepath": "https://c09.s3.us-east-2.amazonaws.com/a53001fa-dee4-427f-a093-95493b5ab8a5",
      "lyrics": "a"
    }
  }
}

```

### createPlaylist:
- description: create playlist for user `user` with playlist title `title`
- request body example:
```
mutation {
  createPlaylist(title:"hehe", user:"a") {
    _id
    title
    user
  }
}
```
- response body example:
```
{
  "data": {
    "createPlaylist": {
      "_id": "607232c4c1c51000155aabf8",
      "title": "hehe",
      "user": "a"
    }
  }
}
```

### deletePlaylistById
- description: delete playlist given database id `_id`
- request body example:
```
mutation {
  deletePlaylistById(_id: "607232c4c1c51000155aabf8") {
    title
    user
    songs  {
      songName
      artist
      filepath
      lyrics
    }
  } 
}
```
- response body example:
```
{
  "data": {
    "deletePlaylistById": {
      "title": "hehe",
      "user": "a",
      "songs": []
    }
  }
}
```

### addSongToPlaylist
- description: add song `songId` to playlist `playlistId`
- request body example:
```
mutation {
  addSongToPlaylist(playlistId:"60722c99c1c51000155aabeb", songId:"606f865676ec220015956f9f") {
    title
    user
    songs {
      songName
      artist
      filepath
      lyrics
    }
  }
}

```
- response body example:
```
{
  "data": {
    "addSongToPlaylist": {
      "title": "a",
      "user": "a",
      "songs": [
        {
          "songName": "LIKEY",
          "artist": "TWICE",
          "filepath": "https://c09.s3.us-east-2.amazonaws.com/b7323624-d13b-4bca-b750-02b2dd23a4ff",
          "lyrics": "[00:13.65]seollenda Me likey\\n[00:15.36]Me likey likey likey\\n[00:17.32]Me likey likey likey\\n[00:19.34]dugeun dugeun dugeun (Heart heart)\\n[00:21.88]Me likey\\n[00:22.62]Me likey likey likey\\n[00:24.87]Me likey likey likey\\n[00:26.44]dugeun dugeun dugeun\\n[00:28.56]jakku deureonaego shipji jakkuman\\n[00:31.63]sasohan geot hanakkaji jeonbuda\\n[00:35.34]jageun hwamyeon soge naega jeil yeppeo boigopa\\n[00:39.76]ajigeun gamchweo ireon nae maeum kkukkuk\\n\\n[00:43.04]meot burindaneun geon jeongmal gwichaneun geo\\n[00:46.56]geureotago jeolttae daechunghal suga eomneungeol (Oh)\\n[00:51.13]maeil gaseum ttwige hae\\n[00:52.50]igeon niga mollayaman dwae\\n[00:54.59]geureomyeonseo ppeonppeonhage\\n\\n[00:57.80]BBkeurim papapa\\n[00:59.36]ripseutigeul mammamma\\n[01:01.24]kamerae damabolkka yeppeuge\\n[01:05.14]igeo bomyeon useo jweo\\n[01:06.49]geurigo kkok nulleo jweo\\n[01:08.51]jeo mite angjeungmatgo saeppalgan\\n[01:11.05](Heart heart)\\n\\n[01:12.94]geunde joayoran mareun ppeonhae\\n[01:15.74]nae mam pyohyeonhagien bujokande\\n[01:19.81]geunde joayo jamdo mot jado\\n[01:22.88]jigakage dwaedo joeungeol\\n\\n[01:27.06]seollenda Me likey\\n[01:28.07]Me likey likey likey\\n[01:29.93]Me likey likey likey\\n[01:32.07]dugeun dugeun dugeun (Heart heart)\\n[01:34.64]Me likey\\n[01:35.36]Me likey likey likey\\n[01:37.41]Me likey likey likey\\n[01:39.51]dugeun dugeun dugeun (Heart heart)\\n\\n[01:41.79]sumeul hup chama jipeoreul ollige\\n[01:44.71]dashi hanbeon heorireul hup\\n[01:46.35]eurachachacha da ibeotta Baby\\n[01:49.35]sesangen yeppeun oshi neomunado manko mana (Whoa)\\n\\n[01:56.10]BBkeurim papapa\\n[01:57.63]ripseutigeul mammamma\\n[01:59.35]kamerae damabolkka yeppeuge\\n[02:03.36]igeo bomyeon useo jweo\\n[02:04.95]geurigo kkok nulleo jweo\\n[02:06.65]jeo mite angjeungmatgo saeppalgan\\n[02:09.56](Heart heart)\\n\\n[02:10.88]geunde joayoran mareun ppeonhae\\n[02:13.81]nae mam pyohyeonhagien bujokande\\n[02:17.93]geunde joayo jamdo mot jado\\n[02:21.14]jigakage dwaedo joeungeol\\n\\n[02:26.65]geujeo barabogo itji\\n[02:30.27]amu maldo hal su eopji Oh\\n[02:33.87]jogeumman deo dagawayo nae mam arajweoyo\\n[02:37.82]deo isang gamchugoman shipji ana\\n\\n[02:42.06]Uh oneulttara gibuni kkulkkulhae\\n[02:43.97]an geureoncheokae bwado seulpeunyae\\n[02:45.87]amu baneung eomneun neo ttaeme ppijeonneunde\\n[02:47.49]nunchi eopshi chingudeuri naorago bureune\\n[02:49.55]Oh jamkkanman jamkkanman\\n[02:50.92]yeollagi ijeya oneungeol Woo\\n[02:52.91]harujongil gibuni watta gatta\\n[02:54.86]uldagado dashi shinnaseo chumchune\\n\\n[03:10.26]seollenda Me likey\\n[03:11.25]Me likey likey likey\\n[03:13.70]Me likey likey likey\\n[03:15.56]dugeun dugeun dugeun (Heart heart)\\n[03:18.00]Me likey\\n[03:18.81]Me likey likey likey\\n[03:20.00]Me likey likey likey\\n[03:22.85]dugeun dugeun dugeun (Heart heart)"
        }
      ]
    }
  }
}
```

### removeSongFromPlaylist
- description: remove song `songId` from playlist `playlistId`
- request body example:
```
mutation {
  removeSongFromPlaylist(playlistId:"60722c99c1c51000155aabeb", songId:"606f865676ec220015956f9f") {
    title
    user
    songs {
      songName
      artist
      filepath
      lyrics
    }
  }
}
```
- response body example:
```
{
  "data": {
    "removeSongFromPlaylist": {
      "title": "a",
      "user": "a",
      "songs": []
    }
  }
}
```

### createRoom
- description: create karaoke room hosted by `host`
- request body example:
```
mutation {
	createRoom(host:"tsm fan") {
  	  _id
	  host
	}
}
```
- response body example:
```
{
  "data": {
    "createRoom": {
      "_id": "60723583c1c51000155aabfa",
      "host": "tsm fan"
    }
  }
}

```

### deleteRoom
- description: delete room `_id`
- request body example:
```
mutation {
	deleteRoom(_id: "60723583c1c51000155aabfa") {
	  host
	}
}
```
- response body example:
```
{
  "data": {
    "deleteRoom": {
      "host": "tsm fan"
    }
  }
}
```

 
## Create

- description: signup for an account
- request: `POST /signup`
    - content-type: `application/json`
    - body: object
      - username: (string) the username of the user
      - password: (string) the password of the user
- response: 200
    - content-type: `application/json`

    - body: object
      - token: (string) the jwt authentication token 
      - status: “Successfully signed up
- response: 500
    - body: “Internal Server Error”
```
curl -X POST  https://www.project-catjam.me/signup 
  	-H "Content-Type: application/json" 
   	 -d "{\"username\":\"c\", \"password\":\"c\"}"
```

- description: login to an account
- request: `POST /login`
    - content-type: `application/json`
    - body: object
      - username: (string) the username of the user
      - password: (string) the password of the user
- response: 200
    - content-type: `application/json`
    - body: object
      - token: (string) the jwt authentication token 
      - status: “Successfully logged in”
- response: 401
    - body: Unauthorized

```
curl -X POST  https://www.project-catjam.me/login 
  	-H "Content-Type: application/json" 
   	 -d "{\"username\":\"a\", \"password\":\"a\"}"
```
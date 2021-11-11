**Template handler**

This template created by Jeotique is for newcomer.
This handler is working with mysql database and the module ``mxtorie`` [npm here with documentation](https://www.npmjs.com/package/mxtorie)

**How to start ?**

**First step :**
- `npm i discord.js`
- `npm i mxtorie`
- `npm i mysql`
- `npm i chalk`

**Second step :**
Open the file `config.js` and change the token, etc
Don't forget to change the database connection properties too.
![image](https://user-images.githubusercontent.com/71186872/141164368-505e8878-3740-4816-8ec0-8775e6520f41.png)

**Third step :**
Open the file `model.js` in `./structures/database` and edit it with what you want.
**Don't remove 'serverid' and 'prefix' because example commands is working with it.**
![image](https://user-images.githubusercontent.com/71186872/141164425-44f6adc2-3b5b-4d26-8208-778175d17ce9.png)

**If you edit the model.js for don't forget to edit the file `structures/checkForData.js` too**
![image](https://user-images.githubusercontent.com/71186872/141292515-98310658-1bee-4bed-8992-923254905fde.png)
In blue its the key (name of the table), in red its the values, you insert in 'settings' a new line with values : 'serverid': 'id of the guild' and 'prefix': '+'
If you add something in the `model.js` you will need to add it, example : in `model.js` i add :
```js
{
  name: 'support',
  type: datatype.VARCHAR,
  length: 10
}
```
In `checkForData.js` i will add :
```js
(await client.db.insert('settings', {serverid: guild.id, prefix: client.config.prefix, support: 'off'})).save('settings', ['serverid', 'prefix', 'support'], [{serverid: guild.id}])
```

In `save()` in red you have an array, its the value what you want to save in the database, and in purple its where you want to save (so here you save where `'serverid' = 'the guild id'`)

Above where you have `let settings = await client.db.getAllWhere('settings', [{serverid: guild.id}])` you get every data in the cache where `serverid = 'the guild id'` and you check the length of the result (its returning an array, the `await` is very important because its a **promise**) `if(settings.length < 1)` and if the length is under 1 you will insert the data in the cache and save it after with `.save()`

**Final step :** 
`node .` in your console to start the bot.

**For any support you can find me here : [discord link](https://discord.gg/mxtorie)**
(The server is french but i can answer to english too)

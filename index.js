// Importar dependencias
import express from 'express';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { Connection } from '@solana/web3.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Configurar conexión con Solana usando Helius RPC
const connection = new Connection(process.env.SOLANA_RPC_URL);

async function checkConnection() {
  try {
    const version = await connection.getVersion();
    console.log('✅ Conectado a Solana:', version);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}
checkConnection();

// Middleware básico
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Sniper Bot funcionando!');
});

// Comando básico en Telegram
bot.start((ctx) => {
  ctx.reply('Bienvenido al Sniper Bot de Solana! 🚀');
});

bot.launch();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Cargar variables de entorno desde .env
/*
  TELEGRAM_BOT_TOKEN=tu_token
  SOLANA_RPC_URL=tu_rpc_url
  SNIPER_FEE_WALLET=tu_wallet_para_fees
*/
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logardian } from 'logardian'

import { AppModule } from './app.module';

const logger = new Logardian()

const DEFAULT_APP_HORT = 'localhost'
const DEFAULT_APP_PORT = 3000
const DAY_IN_SECONDS = 86400

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule, { logger }
	);

	const configService = app.get(ConfigService)

	const port = configService.get('PORT') || DEFAULT_APP_PORT
	const hostname = configService.get('HOST') || DEFAULT_APP_HORT

	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');

	const logardianLabels = configService.get('LOGARDIAN_LABELS') || '*'
	const logardianTrace = configService.get('LOGARDIAN_TRACE') === 'true'
	const logardianJson = configService.get('LOGARDIAN_JSON') === 'true'

	logger.configure({
		labels: logardianLabels.split(','),
		trace: logardianTrace,
		json: logardianJson,
	})

	await app.listen(port, hostname, () =>
		logger.log(`Server running at http://${hostname}:${port}/`),
	)
}
bootstrap();

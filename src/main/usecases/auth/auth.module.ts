import { Module } from '@nestjs/common';
import { AuthController } from '../../../presentation/controllers/auth/auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwtStrategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { UsersModule } from '../users/user.module';
import { makeDbAuthentication } from 'src/main/factories/auth/db-auth';
import { makeDbAddAccount } from 'src/main/factories/account/db-account';
import { makeDbRefreshToken } from 'src/main/factories/auth/db-refresh-token';
import { TokenDecoderAdapter } from 'src/infra/cryptography/token-decoder';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useFactory: () => {
        const dbAuthentication = makeDbAuthentication();
        const dbAddAccount = makeDbAddAccount();
        const dbRefreshToken = makeDbRefreshToken();
        const jwtService = new JwtService();
        const tokenDecoder = new TokenDecoderAdapter(jwtService);

        return new AuthService(
          dbAuthentication,
          dbAddAccount,
          dbRefreshToken,
          tokenDecoder,
        );
      },
    },
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

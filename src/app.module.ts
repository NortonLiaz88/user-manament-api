import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/orm/prisma/prisma.module';
import { AuthModule } from './main/usecases/auth/auth.module';
import { UsersModule } from './main/usecases/users/user.module';
import { UserProfileModule } from './main/usecases/user-profile/user-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    UserProfileModule,
  ],
})
export class AppModule {}

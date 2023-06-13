import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePwDto } from './dto/update-pw.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }


  // ==================================== Sign up ====================================
  async signUp(signUpDto: SignUpDto): Promise<{ success: boolean, user: User }> {
    const { firstname, lastname, username, email, password } = signUpDto;

    let existUser = await this.userModel.findOne({ username });
    if (existUser) {
      throw new HttpException('Username is already taken', HttpStatus.BAD_REQUEST);
    }

    existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new HttpException('Gmail is already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPw = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPw,
    });

    return {
      success: true,
      user: user
    };
  }


  // ==================================== Login ====================================
  async login(loginDto: LoginDto): Promise<{
    success: boolean; user: User
  }> {
    const { username, password } = loginDto;
    let user = await this.userModel.findOne({ username });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return {
          success: true,
          user: user
        };
      }
    }
    throw new HttpException('Username or password is incorrect!', HttpStatus.BAD_REQUEST);
  }


  // ==================================== logout ====================================
  logout(session: any): { status: boolean; message?: string; err?: any } {

    try {
      session.destroy();
      return {
        status: true,
        message: "Logout successfully!"
      };
    } catch (error) {
      return {
        status: false,
        err: error
      };
    }
  }


  // ==================================== user =====================================================
  async findById(_id: string): Promise<{ user?: User, status?: boolean; message?: string; err?: any }> {
    try {
      const user = await this.userModel.findById(_id);
      return { user };
    } catch (error) {
      return {
        status: false,
        message: 'User not found with this ID!'
      }
    }
  }



  // ==================================== delete user by id =========================================
  async deleteUserById(_id: string): Promise<{ status?: boolean; message?: string; }> {
    try {
      await this.userModel.findOneAndDelete({ _id });
      return {
        status: true,
        message: 'User with this ID was deleted successfully!'
      }
    } catch (error) {
      return {
        status: false,
        message: 'User not found with this ID!'
      }
    }
  }


  // ==================================== update password ====================================
  async updatePassword(user: any, passwords: UpdatePwDto): Promise<{ status?: boolean, message?: string, error?: any }> {

    try {
      const { password, passwordComfirm } = passwords;
      if (password != passwordComfirm) {
        return {
          status: false,
          message: 'Passwords not match!'
        }
      }

      const hashedPw = await bcrypt.hash(password, 10);
      await this.userModel.findByIdAndUpdate(user.user._id, {password: hashedPw });
      return {
        status: true,
        message: 'Password has updated already!'
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }



  // ===================================== update user ====================================
  async updateUser(user: any, newUser: UpdateUserDto): Promise<{ status?: boolean, message?: string, user?: User, error?: any }> {

    try {
      const { firstname, lastname, username, email } = newUser;
      const currectUser = user.user;
      let existedUser = await this.userModel.findOne({username});
      if ( existedUser && existedUser.username != currectUser.username ) {
        return {
          status: false,
          message: 'Username has already token!'
        }
      }

      existedUser = await this.userModel.findOne({email});
      if (existedUser && existedUser.email != currectUser.email) {
        return {
          status: false,
          message: 'Email has already token!'
        }
      }

      console.log("hi");
      
      const updatedUser = await this.userModel.findByIdAndUpdate(currectUser._id, {
        firstname, lastname, username, email
      });
      return {
        status: true,
        message: 'User has updated already!',
        user: updatedUser
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


}




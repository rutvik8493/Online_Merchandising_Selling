#!/usr/bin/perl

# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

use Crypt::SaltedHash;

my @users = ('cs645','rdesai','adesai','mdesai','sdesai');
my @passwords = ('sp2017','rdesai1','adesai1','mdesai1','sdesai1');
my @encrypted_passwords;
my $arr_len = @users;

for($i=0; $i < $arr_len; $i++) {
my $encryption_object = Crypt::SaltedHash->new(algorithm => 'SHA-2');
$encryption_object->add($passwords[$i]);
push(@encrypted_passwords, $encryption_object->generate);
}

open(DATA,">passwords.dat") or die "Cannot open file";


for($i=0; $i < $arr_len; $i++) {
print DATA $users[$i]."=".$encrypted_passwords[$i]."\n";
}

close(DATA);    

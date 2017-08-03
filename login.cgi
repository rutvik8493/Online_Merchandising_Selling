#!/usr/bin/perl

# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

##---------------------------- MAIN ---------------------------------------

my $q;
my $message="";
if(authenticate_user()) {
createCookie();
}
else {
$message="Error";
}    
###########################################################################

###########################################################################
sub authenticate_user {
$q = new CGI;
my $user = $q->param("username");
my $password = $q->param("password");    
open DATA, "</srv/www/cgi-bin/jadrn010/passwords.dat" 
or die "Cannot open file.";
@file_lines = <DATA>;
close DATA;

$OK = 0; #not authorized

foreach $line (@file_lines) {
chomp $line;
($stored_user, $stored_pass) = split /=/, $line;    
if($stored_user eq $user && Crypt::SaltedHash->validate($stored_pass, $password)) {
$OK = 1;
last;
}
}
return $OK;
}    
sub createCookie{
my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
$session->expires('+1d');
my $cookie = $q->cookie(jadrn010SID => $session->id);
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser    
my $sid = $session->id;
$message="Success";
}

print "Content-type: text/html\n\n";
print $message;





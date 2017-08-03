#!/usr/bin/perl

# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn010SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

my $message = "";

if($cookie_sid eq $sid) {
$message = "Success";
}
else{
$message = "Error";
}

print "Content-type: text/html\n\n";
print $message;



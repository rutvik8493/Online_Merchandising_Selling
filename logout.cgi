
# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn010SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->clear();
$session->delete();
my $cookie = $q->cookie(jadrn010SID => '');
my $cookieValue = $q->cookie('jadrn010SID');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  


my $message = "";

if($cookieValue) {
$message = "Error";
}
else{
$message = "Success";
}

print "Content-type: text/html\n\n";
print $message;
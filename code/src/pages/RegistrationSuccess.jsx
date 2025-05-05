import { CheckCircle, PartyPopper } from "lucide-react";
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function RegistrationSuccess({ companyName, onRegisterAnother }) {
  return (
    <Card className="registration-success">
      <CardHeader>
        <div className="success-icon-container">
          <CheckCircle className="success-icon" />
        </div>
        <CardTitle>Registration Successful!</CardTitle>
        <CardDescription>
          <PartyPopper className="description-icon" />
          Congratulations! <span className="company-name">{companyName}</span> has been successfully registered on the SC AD System (simulation).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onRegisterAnother}>
          Register Another Company
        </Button>
      </CardContent>
    </Card>
  );
}